// Global page props type for Next.js 15
export interface PageProps<T = any> {
  params: Promise<T>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
