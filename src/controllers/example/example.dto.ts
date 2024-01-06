import z from 'zod';

export const ExampleBodySchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
});

export type TExampleBody = z.infer<typeof ExampleBodySchema>;
