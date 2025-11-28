import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Teams', href: '/teams' },
    { title: 'Edit Team', href: '#' },
];

interface Props {
    team: {
        id: number;
        name: string;
    };
}

export default function TeamsEdit({ team }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: team.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/teams/${team.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Team" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Team</h1>
                    <p className="text-gray-600 mt-1">Update team information</p>
                </div>

                <Card className="bg-white border-gray-200 max-w-2xl">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-xl text-gray-900">Team Information</CardTitle>
                        <CardDescription className="text-gray-600">Update the team's name below</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 font-medium">Team Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g., Development Team"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                >
                                    {processing ? 'Updating...' : 'Update Team'}
                                </Button>
                                <Link href="/teams">
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

