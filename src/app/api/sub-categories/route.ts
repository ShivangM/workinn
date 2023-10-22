import { db } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

const PAGE_LIMIT = 10;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '0');
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json(
      { error: 'Category is required' },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }

  const subCategoriesRef = db
    .collection('categories')
    .doc(category)
    .collection('sub-categories');
  const total = await subCategoriesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);
  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const subCategoriesSnapshot = await subCategoriesRef
    .limit(PAGE_LIMIT)
    .offset(page * PAGE_LIMIT)
    .get();
  const data = subCategoriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.categoryId = category;
    return data;
  });

  return NextResponse.json(
    { data, total, pageTotal },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
