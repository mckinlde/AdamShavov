import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    stats: {
        total_users: number;
        total_teams: number;
        total_projects: number;
        total_reviews: number;
        my_reviews: number;
        visible_projects?: number;
    };
    user: {
        name: string;
        role: string;
    };
}

export default function Dashboard({ stats, user }: Props) {
    const isExecutive = user.role === 'executive';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6 bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
                    <p className="text-gray-600 mt-1">Here's an overview of your system</p>
                </div>

                <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {isExecutive && (
                        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-gray-700">Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">{stats.total_users}</div>
                                <CardDescription className="text-gray-600 mt-1">System users</CardDescription>
                            </CardContent>
                        </Card>
                    )}

                    {isExecutive && (
                        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-semibold text-gray-700">Total Teams</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">{stats.total_teams}</div>
                                <CardDescription className="text-gray-600 mt-1">Active teams</CardDescription>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">
                                {isExecutive ? 'Total Projects' : 'My Projects'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">
                                {isExecutive ? stats.total_projects : stats.visible_projects || 0}
                            </div>
                            <CardDescription className="text-gray-600 mt-1">
                                {isExecutive ? 'All projects' : 'Projects I can access'}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">My Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{stats.my_reviews}</div>
                            <CardDescription className="text-gray-600 mt-1">Reviews I've written</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {isExecutive && (
                        <Link href="/users">
                            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300">
                                <CardHeader>
                                    <CardTitle className="text-gray-900">Manage Users</CardTitle>
                                    <CardDescription className="text-gray-600">View and manage all users</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Users</Button>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {isExecutive && (
                        <Link href="/teams">
                            <Card className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300">
                                <CardHeader>
                                    <CardTitle className="text-gray-900">Manage Teams</CardTitle>
                                    <CardDescription className="text-gray-600">View and manage teams</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Teams</Button>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    <Link href="/projects">
                        <Card className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300">
                            <CardHeader>
                                <CardTitle className="text-gray-900">View Projects</CardTitle>
                                <CardDescription className="text-gray-600">Browse all projects</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Projects</Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/reviews">
                        <Card className="bg-white border-gray-200 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300">
                            <CardHeader>
                                <CardTitle className="text-gray-900">View Reviews</CardTitle>
                                <CardDescription className="text-gray-600">Read and write reviews</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Reviews</Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
