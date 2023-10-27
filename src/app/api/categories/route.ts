import { Category } from "@/interfaces/service";
import { db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    categories: Category[];
}>> {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('searchTerm');

    const categoriesRef = searchTerm ?
        db.collection('categories').where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff') :
        db.collection('categories');
    const categoriesSnapshot = await categoriesRef.get();

    const categories = categoriesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    }) as Category[];

    return NextResponse.json({ categories }, {
        status: 200,
        statusText: 'OK',
    })
}