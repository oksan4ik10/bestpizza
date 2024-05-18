export type TInputPropsForm = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export interface ICardLocal {
    id: string;
    count: number;
    idRes: number;
}
export interface ICart {
    id: string;
    count: number;
    idRes: number;
    price: number;
    name: string;
    img: string
}