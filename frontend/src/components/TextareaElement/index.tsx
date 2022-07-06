import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import './TextareaElement.scss';

interface TextareaElementProps {
    value: string;
    addedClass?: string;
    placeholder?: string;
    handlerOnSave: (changeContent: string) => void;
}

const TextareaElement: React.FC<TextareaElementProps> = ({value, 
    addedClass = "",
    placeholder = "", 
    handlerOnSave}) => {

    const id = useParams().id;

    const [content, setContent] = useState<string>(value);

    const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

    const setCurrentHeight = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + 'px';
    }

    const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    }

    const onBlurHandler = () => {
        handlerOnSave(content);
    }

    const onKeyDownHandle = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setContent(value);
            textareaRef.current.blur();
        }
        if (e.key === "Enter") textareaRef.current.blur();
        
    }, [value])

    useEffect(() => {

        textareaRef.current.addEventListener('keydown', onKeyDownHandle);

    }, [onKeyDownHandle])

    useEffect(() => {
        (async() => {
            
            await setContent(value);
            await setCurrentHeight();

        })();

    }, [textareaRef, id, value]);

    return (<textarea ref={textareaRef}
                      className={`textarea ${addedClass}`}
                      value={content}
                      onInput={setCurrentHeight}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      placeholder={placeholder}></textarea>)
}

export default TextareaElement;