import { UserData } from "@/interfaces/user";
import { auth, db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    user?: UserData,
    error?: string
}>> {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, {
            status: 401,
            statusText: 'Unauthorized',
        })
    }

    const decodedToken = await auth.verifyIdToken(token.value);
    const uid = decodedToken.uid;

    const userRef = db.collection('users').doc(uid);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data() as UserData;

    return NextResponse.json({ user }, {
        status: 200,
        statusText: 'OK',
    })
}