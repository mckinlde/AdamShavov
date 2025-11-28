import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Create Review', href: '/reviews/create' },
];

interface Props {
    users: Array<{ id: number; name: string; email: string }>;
    projects: Array<{ id: number; name: string }>;
}

export default function ReviewsCreate({ users, projects }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        reviewable_type: '',
        reviewable_id: '',
        content: '',
        rating: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const reviewableType = data.reviewable_type === 'user' 
            ? 'App\\Models\\User' 
            : 'App\\Models\\Project';
        
        post('/reviews', {
            reviewable_type: reviewableType,
            reviewable_id: parseInt(data.reviewable_id),
            content: data.content,
            rating: data.rating ? parseInt(data.rating) : null,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Review" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">Create Review</h1>
                    <p className="text-gray-600 mt-1">Write a review for a user or project</p>
                </div>

                <Card className="bg-white border-gray-200 max-w-2xl">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-xl text-gray-900">Review Information</CardTitle>
                        <CardDescription className="text-gray-600">Enter the review details below</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="reviewable_type" className="text-gray-700 font-medium">Review Type</Label>
                                <Select
                                    value={data.reviewable_type}
                                    onValueChange={(value) => {
                                        setData('reviewable_type', value);
                                        setData('reviewable_id', '');
                                    }}
                                >
                                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="project">Project</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.reviewable_type} />
                            </div>

                            {data.reviewable_type === 'user' && (
                                <div className="space-y-2">
                                    <Label htmlFor="reviewable_id" className="text-gray-700 font-medium">Select User</Label>
                                    <Select
                                        value={data.reviewable_id}
                                        onValueChange={(value) => setData('reviewable_id', value)}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.reviewable_id} />
                                </div>
                            )}

                            {data.reviewable_type === 'project' && (
                                <div className="space-y-2">
                                    <Label htmlFor="reviewable_id" className="text-gray-700 font-medium">Select Project</Label>
                                    <Select
                                        value={data.reviewable_id}
                                        onValueChange={(value) => setData('reviewable_id', value)}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.id.toString()}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.reviewable_id} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-gray-700 font-medium">Review Content</Label>
                                <textarea
                                    id="content"
                                    className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    placeholder="Write your review here..."
                                />
                                <InputError message={errors.content} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rating" className="text-gray-700 font-medium">Rating (Optional)</Label>
                                <Select
                                    value={data.rating}
                                    onValueChange={(value) => setData('rating', value)}
                                >
                                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder="Select rating (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 ⭐</SelectItem>
                                        <SelectItem value="2">2 ⭐⭐</SelectItem>
                                        <SelectItem value="3">3 ⭐⭐⭐</SelectItem>
                                        <SelectItem value="4">4 ⭐⭐⭐⭐</SelectItem>
                                        <SelectItem value="5">5 ⭐⭐⭐⭐⭐</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.rating} />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                                >
                                    {processing ? 'Creating...' : 'Create Review'}
                                </Button>
                                <Link href="/reviews">
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

