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
];

interface Project {
    id: number;
    name: string;
    description: string | null;
    teams: Array<{ id: number; name: string }>;
}

interface Props {
    projects: Project[];
    canCreate: boolean;
}

export default function ProjectsIndex({ projects, canCreate }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                        <p className="text-gray-600 mt-1">View and manage projects</p>
                    </div>
                    {canCreate && (
                        <Link href="/projects/create">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create Project</Button>
                        </Link>
                    )}
                </div>

                {projects.length === 0 ? (
                    <Card className="text-center py-12 bg-white border-gray-200">
                        <CardContent>
                            <p className="text-gray-500 mb-4">No projects found.</p>
                            {canCreate && (
                                <Link href="/projects/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create First Project</Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Card key={project.id} className="bg-white border-gray-200">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-900">{project.name}</CardTitle>
                                    {project.description && (
                                        <CardDescription className="text-gray-600 line-clamp-2">
                                            {project.description}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.teams.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Teams:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.teams.map((team) => (
                                                    <Badge 
                                                        key={team.id} 
                                                        variant="outline"
                                                        className="bg-gray-50 text-gray-700 border-gray-300"
                                                    >
                                                        {team.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <Link href={`/projects/${project.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                View
                                            </Button>
                                        </Link>
                                        {canCreate && (
                                            <>
                                                <Link href={`/projects/${project.id}/edit`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.id)}
                                                    className="flex-1"
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
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

