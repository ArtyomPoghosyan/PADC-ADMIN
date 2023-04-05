export class HTTPHelper {

    constructor() { }

    static generateFormData<T>(body: T): FormData {
        const formData = new FormData();
        if (body) {
            for (const key in body) {
                if (body[key] instanceof File) {
                    formData.append(key, body[key] as File);
                    continue;
                }
                if (typeof body[key] === 'object') {
                    formData.append(key, JSON.stringify(body[key]));
                    continue;
                }
                formData.append(key, (body[key]?.toString() as string));
            }
        }

        return formData;
    }

}