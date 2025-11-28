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
    { title: 'Team Details', href: '#' },
];

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Project {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    team: {
        id: number;
        name: string;
        members: Member[];
        projects: Project[];
    };
}

export default function TeamsShow({ team }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this team?')) {
            router.delete(`/teams/${team.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Team: ${team.name}`} />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
                        <p className="text-gray-600 mt-1">Team details and information</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/teams/${team.id}/edit`}>
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Edit</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        <Link href="/teams">
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Back to Teams</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Team Members</CardTitle>
                            <CardDescription className="text-gray-600">
                                Members of this team
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {team.members.length > 0 ? (
                                <div className="space-y-3">
                                    {team.members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-900">{member.name}</p>
                                                <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                                                <Badge 
                                                    variant="outline"
                                                    className="mt-2 bg-gray-50 text-gray-700 border-gray-300"
                                                >
                                                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                                </Badge>
                                            </div>
                                            <Link href={`/users/${member.id}`}>
                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    View User
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    This team has no members.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Team Projects</CardTitle>
                            <CardDescription className="text-gray-600">
                                Projects this team is working on
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {team.projects.length > 0 ? (
                                <div className="space-y-3">
                                    {team.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-900">{project.name}</p>
                                                {project.description && (
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                )}
                                            </div>
                                            <Link href={`/projects/${project.id}`}>
                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    View Project
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    This team is not assigned to any projects.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

