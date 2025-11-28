import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: '/projects' },
    { title: 'Create Project', href: '/projects/create' },
];

interface Props {
    teams: Array<{ id: number; name: string }>;
}

export default function ProjectsCreate({ teams }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        team_ids: [] as number[],
    });

    const toggleTeam = (teamId: number) => {
        setData('team_ids', 
            data.team_ids.includes(teamId)
                ? data.team_ids.filter(id => id !== teamId)
                : [...data.team_ids, teamId]
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/projects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">Create Project</h1>
                    <p className="text-gray-600 mt-1">Add a new project to the system</p>
                </div>

                <Card className="bg-white border-gray-200 max-w-2xl">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-xl text-gray-900">Project Information</CardTitle>
                        <CardDescription className="text-gray-600">Enter the project's details below</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 font-medium">Project Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g., Website Redesign"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                                <textarea
                                    id="description"
                                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter project description..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium">Assign Teams</Label>
                                <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    {teams.map((team) => (
                                        <div key={team.id} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`team-${team.id}`}
                                                checked={data.team_ids.includes(team.id)}
                                                onCheckedChange={() => toggleTeam(team.id)}
                                                className="border-gray-300"
                                            />
                                            <label
                                                htmlFor={`team-${team.id}`}
                                                className="text-sm font-medium text-gray-700 leading-none cursor-pointer"
                                            >
                                                {team.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <InputError message={errors.team_ids} />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                >
                                    {processing ? 'Creating...' : 'Create Project'}
                                </Button>
                                <Link href="/projects">
                                    <Button type="button" variant="outline" className="border-gray-300 hover:bg-gray-50">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

