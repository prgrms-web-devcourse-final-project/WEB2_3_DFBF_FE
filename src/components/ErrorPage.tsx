import Button from '@/components/button/Button';
import sad from '@/assets/icons/sad-icon.svg';

interface ErrorPageProps {
  title: string;
  message: string | string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
  buttonText: string;
}

const messageText = (message: string | string[]) => {
  if (Array.isArray(message)) return message.map((text, index) => <p key={index}>{text}</p>);
  return <p>{message}</p>;
};

export default function ErrorPage({ title, message, onClick, buttonText }: ErrorPageProps) {
  return (
    <div className="relative w-full max-w-[600px] px-3 bg-background flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="text-[28px] font-bold text-primary-normal">{title}</p>
        <div className="flex flex-col justify-center items-center text-gray-60">
          {messageText(message)}
        </div>
        <img src={sad} className="w-[80px] h-[80px]" alt="sad" />
      </div>

      <div className="absolute bottom-10 flex px-3 w-full">
        <Button onClick={onClick} variant="primary">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
