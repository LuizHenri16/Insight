import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const ModalCreateProduct = () => {

    function handleSubmit() {

    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 p-2">
                <label htmlFor="produto">Produto</label>
                <Input />
            </div>
            <div className="flex justify-end">
                <Button className="w-[10rem]" type="submit">Salvar</Button>
            </div>
        </form>
    )
}