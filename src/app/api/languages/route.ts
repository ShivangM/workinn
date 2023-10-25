import { Language } from "@/interfaces/user";
import { db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    languages: Language[];
}>> {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('searchTerm');

    const languagesRef = searchTerm ?
        db.collection('languages').where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff') :
        db.collection('languages');
    const languagesSnapshot = await languagesRef.get();

    const languages = languagesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    }) as Language[];

    return NextResponse.json({ languages }, {
        status: 200,
        statusText: 'OK',
    })
}