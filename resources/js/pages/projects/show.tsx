import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: '/projects' },
    { title: 'Project Details', href: '#' },
];

interface Team {
    id: number;
    name: string;
}

interface Advisor {
    id: number;
    name: string;
    email: string;
}

interface Props {
    project: {
        id: number;
        name: string;
        description: string | null;
        teams: Team[];
        advisors: Advisor[];
    };
    canEdit: boolean;
}

export default function ProjectsShow({ project, canEdit }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${project.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.name}`} />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                        <p className="text-gray-600 mt-1">Project details and information</p>
                    </div>
                    <div className="flex gap-2">
                        {canEdit && (
                            <>
                                <Link href={`/projects/${project.id}/edit`}>
                                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Edit</Button>
                                </Link>
                                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                            </>
                        )}
                        <Link href="/projects">
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Back to Projects</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Project Information</CardTitle>
                            <CardDescription className="text-gray-600">Basic project details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Project Name</p>
                                <p className="text-base text-gray-900">{project.name}</p>
                            </div>
                            {project.description && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                                    <p className="text-base text-gray-900 whitespace-pre-wrap">{project.description}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Assigned Teams</CardTitle>
                            <CardDescription className="text-gray-600">
                                Teams working on this project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {project.teams.length > 0 ? (
                                <div className="space-y-3">
                                    {project.teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-900">{team.name}</p>
                                            </div>
                                            <Link href={`/teams/${team.id}`}>
                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    View Team
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No teams assigned to this project.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {project.advisors.length > 0 && (
                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Internal Advisors</CardTitle>
                            <CardDescription className="text-gray-600">
                                Users serving as advisors on this project
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-3">
                                {project.advisors.map((advisor) => (
                                    <div
                                        key={advisor.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900">{advisor.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">{advisor.email}</p>
                                        </div>
                                        <Link href={`/users/${advisor.id}`}>
                                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                View User
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

