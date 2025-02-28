export abstract class DomainService<Params, Response> {
  abstract exec(params?: Params): Response;
}
