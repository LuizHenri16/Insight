import { Input } from "@/components/ui/input"
import MultiSelect from "../multiSelect"
import Select from "../select"
import { Button } from "@/components/ui/button"

export const CreateForm = () => {
    return (
        <div>
            <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-200">
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name">Nome da empresa</label>
                        <Input type="text" placeholder="Digite o nome da empresa" />
                    </div>

                    <div>
                        <label htmlFor="name">CNPJ</label>
                        <Input type="text" placeholder="Digite o CNPJ" />
                    </div>

                    <div>
                        <label htmlFor="name">Conta</label>
                        <Input type="text" placeholder="Digite o número da conta" />
                    </div>

                    <div>
                        <label htmlFor="name">Sócio 1</label>
                        <Input type="text" placeholder="Digite o nome do sócio 1" />
                    </div>

                    <div>
                        <label htmlFor="name">CPF/CNPJ 1</label>
                        <Input type="text" placeholder="Digite o CPF/CNPJ do sócio 1" />
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name">Sócio 2</label>
                        <Input type="text" placeholder="Digite o nome do sócio 2" />
                    </div>

                    <div>
                        <label htmlFor="name">CPF/CNPJ 2</label>
                        <Input type="text" placeholder="Digite o CPF/CNPJ do sócio 2" />
                    </div>

                    <div>
                        <label htmlFor="name">Telefone</label>
                        <Input type="text" placeholder="Digite o telefone" />
                    </div>

                    <div>
                        <label htmlFor="name">Email</label>
                        <Input type="text" placeholder="Digite o email" />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="">Investimentos</label>
                        <MultiSelect options={[{ id: "1", nomeDoItem: "Investimento 1" }, { id: "2", nomeDoItem: "Investimento 2" }, { id: "3", nomeDoItem: "Investimento 3" }]} />
                    </div>

                    <div>
                        <label htmlFor="">Produtos/Serviços</label>
                        <MultiSelect options={[{ id: "1", nomeDoItem: "Produto 1" }, { id: "2", nomeDoItem: "Produto 2" }, { id: "3", nomeDoItem: "Produto 3" }]} />
                    </div>

                    <div>
                        <label htmlFor="">Rating de Crédito</label>
                        <Select options={[{ id: "1", nomeDoItem: "Rating 1" }, { id: "2", nomeDoItem: "Rating 2" }, { id: "3", nomeDoItem: "Rating 3" }]} />
                    </div>

                    <div>
                        <label htmlFor="">Cheque especial</label>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Select options={[{ id: "1", nomeDoItem: "Sim" }, { id: "2", nomeDoItem: "Não" }]} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <Button variant="outline" className="w-full">Cancelar</Button>
                        <Button className="w-full">Cadastrar</Button>
                    </div>
                </div>
            </form >
        </div >
    )
}