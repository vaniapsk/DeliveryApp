import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../database/prismaClient';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error('Invalid username or password');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }

    //Blue Bananas
    const token = sign({ username }, '4a6cfc346fcca7d814f7a3ac986197f1', {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
