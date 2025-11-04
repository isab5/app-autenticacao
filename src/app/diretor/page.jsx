import { verificarAcesso } from "@/utils/auth";

export default async function Diretor() {
      await verificarAcesso(["diretor"]);

    return (
        <div>Area do diretor</div>
    );
}