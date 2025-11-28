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
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    teams: Array<{ id: number; name: string; role: string }>;
}

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                        <p className="text-gray-600 mt-1">Manage system users and their roles</p>
                    </div>
                    <Link href="/users/create">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create User</Button>
                    </Link>
                </div>

                {users.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-gray-500 mb-4">No users found.</p>
                            <Link href="/users/create">
                                <Button>Create First User</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <Card key={user.id} className="bg-white border-gray-200">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-900">{user.name}</CardTitle>
                                    <CardDescription className="text-gray-600">{user.email}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
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
                                    {user.teams.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Teams:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {user.teams.map((team) => (
                                                    <Badge 
                                                        key={team.id} 
                                                        variant="outline"
                                                        className="bg-gray-50 text-gray-700 border-gray-300"
                                                    >
                                                        {team.name} ({team.role})
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <Link href={`/users/${user.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/users/${user.id}/edit`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-50">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
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

