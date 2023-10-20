import admin from "@/utils/firebaseAdmin";
import { type NextRequest } from 'next/server'

const db = admin.firestore();
const PAGE_LIMIT = 10;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || "0");
    const category = searchParams.get('category');
    const subCategory = searchParams.get('sub-category');

    if (!category) {
        return Response.json({ error: "Category is required" }, {
            status: 400,
            statusText: "Bad Request",
        });
    }

    if (!subCategory) {
        return Response.json({ error: "Sub Category is required" }, {
            status: 400,
            statusText: "Bad Request",
        });
    }

    const serviceCategoriesRef = db.collection("categories").doc(category).collection("sub-categories").doc(subCategory).collection("service-categories");
    const total = await serviceCategoriesRef.count().get().then((snapshot) => snapshot.data().count);
    const pageTotal = Math.ceil(total / PAGE_LIMIT);

    const serviceCategoriesSnapshot = await serviceCategoriesRef.limit(PAGE_LIMIT).offset(page * PAGE_LIMIT).get();
    const data = serviceCategoriesSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.categoryId = category;
        data.subCategoryId = subCategory;
        return data;
    });

    return Response.json({ data, total, pageTotal }, {
        status: 200,
        statusText: "OK",
    });
}