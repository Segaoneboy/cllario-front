import {NextResponse} from 'next/server';

const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5000';

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const registrationKey = process.env.CLLARIO_ADMIN_REGISTRATION_KEY;

        const response = await fetch(`${backendUrl}/api/auth/companyRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(registrationKey ? {'x-admin-registration-key': registrationKey} : {}),
            },
            body: JSON.stringify(body),
        });

        const data = await response.json().catch(() => ({}));

        return NextResponse.json(data, {status: response.status});
    } catch(error){
        console.error(error);
        return NextResponse.json(
            {message: 'Ошибка сервера при регистрации компании'},
            {status: 500},
        );
    }
}
