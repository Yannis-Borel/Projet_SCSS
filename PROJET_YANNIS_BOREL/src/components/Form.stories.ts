import type { Meta, StoryObj } from '@storybook/vue3';
import Form from './Form.vue';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    email: { control: 'text', description: 'Adresse email de l\'utilisateur' },
    password: { control: 'text', description: 'Mot de passe de l\'utilisateur' },
    onSubmit: { action: 'submit', description: 'Événement déclenché lors de la soumission' },
  },
};
export default meta;

type Story = StoryObj<typeof Form>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { Form },
    setup() {
      return { args };
    },
    template: `<Form v-bind="args" @submit="args.onSubmit" />`,
  }),
};

export const Default: Story = {
  ...storyOptions,
  args: {
    email: '',
    password: '',
  },
};

export const Prefilled: Story = {
  ...storyOptions,
  args: {
    email: 'example@mail.com',
    password: '123456',
  },
};
