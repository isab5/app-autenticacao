import { verificarAcesso } from "@/utils/auth";

export default async function Professor() {
      await verificarAcesso(["professor"]);

    return (
        <div>Area do Professor</div>
    );
}