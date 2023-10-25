import { Service } from "@/interfaces/service";
import { auth, db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<{
    services?: Service[]
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

    const userServicesRef = db.collection("services").where("ownerId", "==", uid);
    const userServices = await userServicesRef.get();

    const services = userServices.docs.map((service) => ({
        id: service.id,
        ...service.data(),
    })) as Service[];

    return NextResponse.json({ services }, {
        status: 200,
        statusText: 'OK',
    })
}