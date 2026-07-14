import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    { id: 1, email: 'test@gmail.com', password: 'test1212', name: 'John Doe' },
    {
      id: 2,
      email: 'maria@example.com',
      password: 'password123',
      name: 'Maria Santos',
    },
  ];

  // 1. Verify if the user exists and password matches
  async validateUser(email: string, pass: string): Promise<any> {
    const user = this.users.find((user) => user.email === email);
    if (user && user.password === pass) {
      const { password, ...result } = user; // Strip the password for safety
      return result;
    }
    return null;
  }

  async signUp(body: { name: string; email: string; password: string }) {
    const existingUser = this.users.find((user) => user.email === body.email);

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const newUser = {
      id: this.users.length + 1,
      ...body,
    };

    this.users.push(newUser);

    const { password, ...result } = newUser;

    return {
      message: 'User created successfully',
      user: result,
    };
  }

  // 2. Generate a JWT token for the user
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
