import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Tooltip apresenta uma explicação curta associada a um elemento da interface.

### Posicionamentos

- Top: acima do elemento.
- Bottom: abaixo do elemento.
- Left: à esquerda.
- Right: à direita.

### Quando utilizar

- Explicar ícones e ações.
- Complementar botões compactos.
- Apresentar informações adicionais em tabelas.
- Esclarecer termos ou indicadores da interface.

### Boas práticas

- Utilize mensagens curtas e objetivas.
- Não coloque informações essenciais exclusivamente em Tooltips.
- Não utilize Tooltip para formulários ou conteúdos extensos.
- Evite utilizá-lo em elementos que já possuem rótulos claros.

### Acessibilidade

O conteúdo utiliza role="tooltip" e é associado ao elemento acionador por aria-describedby. O Tooltip aparece também quando o elemento recebe foco pelo teclado.
        `,
            },
        },
    },
    args: {
        content: "Informação adicional sobre esta ação.",
        position: "top",
        delay: 300,
        children: <Button>Passar o mouse</Button>,
    },
    argTypes: {
        content: {
            description: "Texto apresentado dentro do Tooltip.",
            control: "text",
        },
        position: {
            description: "Posicionamento do Tooltip em relação ao elemento.",
            control: "select",
            options: ["top", "bottom", "left", "right"],
        },
        delay: {
            description: "Atraso em milissegundos antes de exibir o Tooltip.",
            control: {
                type: "number",
                min: 0,
                max: 2000,
                step: 100,
            },
        },
        children: {
            control: false,
            description: "Elemento que acionará o Tooltip.",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: "Informação adicional sobre esta ação.",
        position: "top",
    },
};

export const Top: Story = {
    args: {
        content: "Tooltip acima do elemento.",
        position: "top",
    },
};

export const Bottom: Story = {
    args: {
        content: "Tooltip abaixo do elemento.",
        position: "bottom",
    },
};

export const Left: Story = {
    args: {
        content: "Tooltip à esquerda do elemento.",
        position: "left",
    },
};

export const Right: Story = {
    args: {
        content: "Tooltip à direita do elemento.",
        position: "right",
    },
};

export const WithoutDelay: Story = {
    args: {
        content: "Exibição imediata.",
        delay: 0,
    },
};

export const IconExplanation: Story = {
    args: {
        content: "Editar informações do veículo.",
        children: (
            <button
                type="button"
                aria-label="Editar veículo"
                style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-surface)",
                    cursor: "pointer",
                }}
            >
                ✎
            </button>
        ),
    },
};