interface IPost {
    id?: string;
    title: string;
    text: string;
    genre: 'Politic' | 'Business' | 'Sport' | 'Other',
    isPrivate: boolean, 
    createdAt?: string;
}

interface IUsers {
    id?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string, // default, primary, info, success, warning, danger, dark
    size?: string, // sm, md, lg
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
  
interface IModal {
    onClick: () => void;
    onClose: () => void;
    header: string;
    text: string;
    closeButton: boolean;
    actions: ReactNode;
}

interface IPagination {
    currentPage: number;
    lastPage: number;
    maxLength: number;
    setCurrentPage: (page: number) => void;
}

interface IPageOptions {
    size: number;
    page: number;
}

interface IPagedPosts {
    pageOptions: IPageOptions;
    total: number;
    results: IPost[];
}