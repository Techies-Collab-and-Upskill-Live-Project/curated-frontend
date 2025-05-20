import bcrypt from 'bcryptjs';


let users = [];


export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Missing credentials' }), {
      status: 400,
    });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  return new Response(JSON.stringify({ message: 'User registered' }), {
    status: 201,
  });
}
