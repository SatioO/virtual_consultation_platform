import { Specialty } from "@/domain/speciality";
export async function categoryFetcher(): Promise<string[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/specialities/categories`
    );
    const data = response.json();
    return data;
}

export async function specialityFetcher(
    category: string
): Promise<Specialty[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/specialities?category=${category}`
    );
    const data = response.json();
    return data;
}
