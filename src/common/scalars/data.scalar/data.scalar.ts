import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DataScalar implements CustomScalar<number, Date> {
  description =
    'salom bu classni nima uchun yozilayotganini umuman tushunmadim';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`value ${value}`);

    return value.getTime();
  }
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind == Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
