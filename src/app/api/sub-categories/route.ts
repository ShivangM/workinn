import { SubCategory } from "@/interfaces/service";
import { db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    subCategories?: SubCategory[];
    error?: string;
}>> {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const searchTerm = searchParams.get('searchTerm');

    if (!categoryId) {
        return NextResponse.json({
            error: 'categoryId is required',
        })
    }

    const subCategoriesRef = searchTerm ?
        db.collection('categories').doc(categoryId).collection('sub-categories').where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff') :
        db.collection('categories').doc(categoryId).collection('sub-categories');
    const subCategoriesSnapshot = await subCategoriesRef.get();

    const subCategories = subCategoriesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    }) as SubCategory[];

    return NextResponse.json({ subCategories }, {
        status: 200,
        statusText: 'OK',
    })
}