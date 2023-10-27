import { ServiceCategory } from "@/interfaces/service";
import { db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    serviceCategories?: ServiceCategory[];
    error?: string;
}>> {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const subCategoryId = searchParams.get('subCategoryId');
    const searchTerm = searchParams.get('searchTerm');

    if (!categoryId) {
        return NextResponse.json({
            error: 'categoryId is required',
        })
    }

    if (!subCategoryId) {
        return NextResponse.json({
            error: 'subCategoryId is required',
        })
    }

    const serviceCategoriesRef = searchTerm ?
        db.collection('categories').doc(categoryId).collection('sub-categories').doc(subCategoryId).collection('service-categories').where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff') :
        db.collection('categories').doc(categoryId).collection('sub-categories').doc(subCategoryId).collection('service-categories');

    const serviceCategoriesSnapshot = await serviceCategoriesRef.get();

    const serviceCategories = serviceCategoriesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    }) as ServiceCategory[];

    return NextResponse.json({ serviceCategories }, {
        status: 200,
        statusText: 'OK',
    })
}