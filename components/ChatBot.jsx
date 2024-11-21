import { Dialog } from "primereact/dialog";
import style from './../style/components/ChatBot.module.css';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UrlConfig } from "@/util/config";
import LayoutContext from "@/layouts/context/layoutContext";
import Link from "next/link";

export default function ChatBot(props) {
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentResponse, setCurrentResponse] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const { user, setUser } = useContext(LayoutContext);

    const headerTemplate = () => {
        return (
            <div className={style.header_container}>
                <Image
                    width={50}
                    height={50}
                    src={"/images/logo-aftrip.png"}
                    alt="/"
                />
            </div>
        );
    };

    useEffect(() => {
        const chatBotMessage = localStorage.getItem("message_chat_bot");
        if (chatBotMessage) {
            setMessages(JSON.parse(chatBotMessage));
        }
    }, [])

    useEffect(() => {
        if (isTyping) {
            const typingInterval = setInterval(() => {
                if (messages[messages.length - 1].message.length != null) {
                    if (currentResponse.length < messages[messages.length - 1].message.length) {
                        setCurrentResponse(messages[messages.length - 1].message.substring(0, currentResponse.length + 1));
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                    }
                }
            }, 50); // Vitesse de saisie en millisecondes

            return () => clearInterval(typingInterval);
        }
    }, [isTyping, currentResponse, messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        const messageCopy = [...messages];
        messageCopy.push({ type: 0, message: messageInput });
        setMessages(messageCopy);
        localStorage.setItem("message_chat_bot", JSON.stringify(messageCopy));


        fetch(`${UrlConfig.apiBaseUrl}/api/chatbot/prompt/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageInput })
        })
            .then(res => res.json())
            .then(data => {
                messageCopy.push({ type: 1, message: data.response });
                setMessages(messageCopy);
                localStorage.setItem("message_chat_bot", JSON.stringify(messageCopy));
                setIsTyping(true);
            })
            .catch((error) => {
                console.log(error);
            });
        setMessageInput("");
    };
    const footerTemplate = () => {
        return (
            <div>
                {user ? (
                    <form onSubmit={sendMessage} className={style.send_message_container}>
                        <input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            type="text"
                            placeholder="Your prompt"
                            className={style.input_message}
                        />
                        <span onClick={sendMessage} className={style.send_icon}>
                            <i className="pi pi-send" />
                        </span>
                    </form>
                ) :
                    (
                        <p>
                            Please <Link href="/users/login">login</Link> or <Link href="/users/register">register</Link> before using the ChatBot.
                        </p>
                    )}
            </div>
        );
    };


    const renderMessageWithLinks = (text) => {
        const linkRegexHttp = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
        if (text) {
            const parts = text.split(linkRegexHttp);
            return parts.map((part, index) => {
                if (index % 3 === 1) {
                    const link = parts[index + 1];
                    return <a className={style.link} key={index} href={link} target="_blank" rel="noopener noreferrer">{part}</a>;
                }
                if (index % 3 === 2) {
                    return null;
                }
                return part;
            });
        }
        return null;
    };

    return (
        <Dialog
            pt={{
                header: { className: style.header },
                closeButtonIcon: { style: { color: "#fff" } }
            }}
            position="right"
            style={{ width: "700px" }}
            header={headerTemplate}
            footer={footerTemplate}
            draggable={false}
            visible={props.visible}
            onHide={props.onHide}>

            <div className={style.message_container}>
                {user && (
                    messages.map((message, index) => {
                        const isLastMessage = index === messages.length - 1;
                        const messageContent = message.type === 0
                            ? <div key={index} className={style.your_message}>{message.message}</div>
                            : <div key={index} className={style.chat_message}>
                                {isTyping && isLastMessage ? currentResponse : renderMessageWithLinks(message.message)}
                            </div>;

                        return messageContent;
                    })
                )}

            </div>
        </Dialog>
    );
}
