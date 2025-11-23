import {useState} from "react";
import Spinner from "@/components/button/Spinner";
import {useSliceData} from "@/hooks/useSliceData";
import {motion, AnimatePresence} from "framer-motion";
import {useTranslation} from "react-i18next"; // i18next import qilingan

const Questions = ({keyslice}: any) => {
    const [openIndex, setOpenIndex] = useState(null);
    // Eslatma: Agar JSON fayllaringizda namespace sifatida FAQ_LIST ISHLASANGIZ
    // useTranslation('faqAll') o'rniga useTranslation('faq_list') dan foydalaning.
    // Lekin sizning misolingizda faqat bitta 'faqAll' nomi berilgan (i18n konfiguratsiyasiga qarab o'zgaradi).
    // Eng to'g'risi, tarjima kalitlarining namespace qismini olib tashlab, Faq.tsx dagi kabi
    // useTranslation('faqAll') dan foydalanib, kalitga to'liq murojaat qilish.

    // Eng oson yechim: FAQ.tsx da 'faqAll' ishlatilgani uchun, questions.tsx da ham uni ishlating.
    const {t} = useTranslation('faqAll'); // Shu yerda namespace 'faqAll'

    const toggleAccordion = (index: any) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const {data, error} = useSliceData(keyslice);

    if (error) return <div>Failed to load data</div>;
    if (!data)
        return (
            <div>
                <Spinner/>
            </div>
        );

    const getData = () => {
        return data;
    };

    return (
        <>
            <div className="gi-accordion style-1">
                {getData().map((item: any, index: number) => (
                    <div
                        key={index}
                        className="gi-accordion-item"
                        onClick={() => toggleAccordion(index)}
                    >
                        {/* **TUZATILGAN QISM:** t() dan foydalanish */}
                        <h4 className="gi-accordion-header">{t(item.questions)}  </h4>
                        <AnimatePresence initial={false}>
                            {openIndex === index &&
                                <motion.div
                                    key={`content-${index}`}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: {height: 'auto', opacity: 1},
                                        collapsed: {height: 0, opacity: 0},
                                    }}
                                    transition={{duration: 0.3, ease: 'easeInOut'}}
                                    style={{overflow: 'hidden'}}
                                >
                                    {/* **TUZATILGAN QISM:** t() dan foydalanish */}
                                    <div className={`gi-accordion-body d-block`}>{t(item.ans)}</div>
                                </motion.div>}
                        </AnimatePresence>

                    </div>
                ))}
            </div>
        </>
    );
};

export default Questions;