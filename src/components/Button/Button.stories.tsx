import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component: `
O **Button** é um componente utilizado para executar ações dentro da interface.

Use-o para confirmar operações, salvar informações, avançar etapas ou executar comandos.

### Variantes
- **Primary:** ação principal de uma seção ou fluxo.
- **Secondary:** ação complementar ou alternativa.

### Tamanhos
- **sm:** ações compactas e espaços reduzidos.
- **md:** tamanho padrão para a maioria das situações.
- **lg:** ações que precisam de maior destaque ou área de interação.

### Boas práticas
- Utilize textos curtos e objetivos, preferencialmente iniciados por verbos.
- Reserve o estilo Primary para a ação de maior importância no contexto.
- Utilize Secondary para ações complementares.
- Evite apresentar várias ações Primary concorrendo pela atenção.
- Utilize \`disabled\` quando a ação não puder ser executada.
- Mantenha textos que expliquem claramente o resultado da interação.
- Para navegação entre páginas, prefira links em vez de botões.
- Preserve a navegação por teclado e a identificação acessível do botão.

### Comportamento
Por padrão, o componente utiliza \`type="button"\`, evitando submissões acidentais de formulários.
Para enviar um formulário, informe explicitamente \`type="submit"\`.
        `,
      },
    },
  },

  args: {
    children: "Continuar",
  },

  argTypes: {
    children: {
      control: "text",
      description: "Texto ou conteúdo apresentado dentro do botão.",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Define a variante visual do botão.",
      table: {
        type: { summary: '"primary" | "secondary"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Define as dimensões do botão.",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Define o comportamento nativo do botão HTML.",
      table: {
        type: { summary: '"button" | "submit" | "reset"' },
        defaultValue: { summary: "button" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação com o botão.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: false,
      description: "Permite adicionar classes CSS complementares.",
    },
    onClick: {
      control: false,
      description: "Manipulador executado quando o botão é acionado.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Ação principal. Utilize quando houver uma operação prioritária.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Continuar",
  },
};

/**
 * Ação complementar. Utilize para alternativas à ação principal.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Cancelar",
  },
};

/**
 * Estado indisponível. O botão não pode ser acionado enquanto estiver desabilitado.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Indisponível",
  },
};

/**
 * Demonstração dos três tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

/**
 * Demonstra o uso do botão para submissão de formulários.
 */
export const Submit: Story = {
  args: {
    type: "submit",
    children: "Salvar informações",
  },
};
