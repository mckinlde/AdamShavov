import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Edit Review', href: '#' },
];

interface Props {
    review: {
        id: number;
        content: string;
        rating: number | null;
    };
}

export default function ReviewsEdit({ review }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        content: review.content,
        rating: review.rating,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/reviews/${review.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Review" />
            <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Review</h1>
                    <p className="text-gray-600 mt-1">Update review information</p>
                </div>

                <Card className="bg-white border-gray-200 max-w-2xl">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-xl text-gray-900">Review Information</CardTitle>
                        <CardDescription className="text-gray-600">Update the review details below</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
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
                                    value={data.rating ? data.rating.toString() : ''}
                                    onValueChange={(value) => setData('rating', value ? parseInt(value) : null)}
                                >
                                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder="Select rating (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">No Rating</SelectItem>
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
                                    {processing ? 'Updating...' : 'Update Review'}
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

