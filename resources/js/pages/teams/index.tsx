import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Teams', href: '/teams' },
];

interface Team {
    id: number;
    name: string;
    members: Array<{ id: number; name: string; role: string }>;
    projects: Array<{ id: number; name: string }>;
}

interface Props {
    teams: Team[];
}

export default function TeamsIndex({ teams }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this team?')) {
            router.delete(`/teams/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teams" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
                        <p className="text-gray-600 mt-1">Manage teams and their members</p>
                    </div>
                    <Link href="/teams/create">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create Team</Button>
                    </Link>
                </div>

                {teams.length === 0 ? (
                    <Card className="text-center py-12 bg-white border-gray-200">
                        <CardContent>
                            <p className="text-gray-500 mb-4">No teams found.</p>
                            <Link href="/teams/create">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create First Team</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {teams.map((team) => (
                            <Card key={team.id} className="bg-white border-gray-200">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-900">{team.name}</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {team.members.length} member{team.members.length !== 1 ? 's' : ''} • {team.projects.length} project{team.projects.length !== 1 ? 's' : ''}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {team.members.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Members:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {team.members.map((member) => (
                                                    <Badge 
                                                        key={member.id} 
                                                        variant="outline"
                                                        className="bg-gray-50 text-gray-700 border-gray-300"
                                                    >
                                                        {member.name} ({member.role})
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {team.projects.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Projects:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {team.projects.map((project) => (
                                                    <Badge 
                                                        key={project.id} 
                                                        variant="secondary"
                                                        className="bg-blue-50 text-blue-700 border-blue-200"
                                                    >
                                                        {project.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <Link href={`/teams/${team.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/teams/${team.id}/edit`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(team.id)}
                                            className="flex-1"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

