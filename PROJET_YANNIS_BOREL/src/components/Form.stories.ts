import type { Meta, StoryObj } from '@storybook/vue3';
import RegisterForm from './RegisterForm.vue';

const meta: Meta<typeof RegisterForm> = {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  argTypes: {
    username: { control: 'text', description: 'Nom d\'utilisateur' },
    email: { control: 'text', description: 'Adresse email' },
    password: { control: 'text', description: 'Mot de passe' },
    onSubmit: { action: 'submit', description: 'Événement de soumission' },
  },
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

const storyOptions: Omit<Story, 'args'> = {
  render: (args) => ({
    components: { RegisterForm },
    setup() {
      return { args };
    },
    template: `<RegisterForm v-bind="args" @submit="args.onSubmit" />`,
  }),
};

export const Default: Story = {
  ...storyOptions,
  args: {
    username: '',
    email: '',
    password: '',
  },
};

export const Prefilled: Story = {
  ...storyOptions,
  args: {
    username: 'TestUser',
    email: 'testuser@example.com',
    password: 'password123',
  },
};
