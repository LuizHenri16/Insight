"use client"

import { Input } from "./input"
import { maskCNPJ, maskPhone, maskCPForCNPJ } from "@/utils/masks"

type MaskType = "cnpj" | "phone" | "cpfCnpj"

const maskFns: Record<MaskType, (v: string) => string> = {
  cnpj: maskCNPJ,
  phone: maskPhone,
  cpfCnpj: maskCPForCNPJ,
}

type MaskedInputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  mask: MaskType
  onChange: (value: string) => void
}

export const MaskedInput = ({ mask, onChange, value, ...props }: MaskedInputProps) => {
  const applyMask = maskFns[mask]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const masked = applyMask(raw)
    onChange(masked)
  }

  const raw = typeof value === "string" ? value : ""

  return (
    <Input
      {...props}
      value={raw}
      onChange={handleChange}
    />
  )
}
