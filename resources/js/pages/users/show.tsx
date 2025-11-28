import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Users', href: '/users' },
    { title: 'User Details', href: '#' },
];

interface Team {
    id: number;
    name: string;
    role: string;
}

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        teams: Team[];
    };
}

export default function UsersShow({ user }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${user.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600 mt-1">User details and information</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/users/${user.id}/edit`}>
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Edit</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        <Link href="/users">
                            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Back to Users</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Basic Information</CardTitle>
                            <CardDescription className="text-gray-600">User account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
                                <p className="text-base text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Email Address</p>
                                <p className="text-base text-gray-900">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Role</p>
                                <Badge 
                                    variant={user.role === 'executive' ? 'default' : 'secondary'}
                                    className={
                                        user.role === 'executive' 
                                            ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                            : 'bg-gray-100 text-gray-800 border-gray-200'
                                    }
                                >
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-gray-200">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900">Team Memberships</CardTitle>
                            <CardDescription className="text-gray-600">
                                Teams this user belongs to
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {user.teams.length > 0 ? (
                                <div className="space-y-3">
                                    {user.teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-900">{team.name}</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Role: {team.role.charAt(0).toUpperCase() + team.role.slice(1)}
                                                </p>
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
                                    This user is not assigned to any teams.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

