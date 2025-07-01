import { Container } from './styles';

export function Section({ title, children }: any) {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  );
}
