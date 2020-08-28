export class DomUtils {
	static clearInputs(inputIds: string[]) {
		inputIds.forEach((inputId: string) => {
			(document.getElementById(inputId) as HTMLInputElement).value = "";
		});
	}
}
