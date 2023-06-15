import Image from "next/image";
import { useTranslation } from 'react-i18next';
/******Menu-materials-content-images*********/
import table from "../public/materials/prod/table_new.jpg";
import shelf from "../public/materials/prod/shelf_new.jpg";
import swing from "../public/materials/prod/swing_new.jpg";
import horse from "../public/materials/prod/horsee.jpg";
import chair from "../public/materials/prod/chair_new.jpg";
/*********************************************/
import { HashLink as Link } from "react-router-hash-link";
import { BrowserRouter } from "react-router-dom";

export default function Menu() {
    const { t } = useTranslation();
    return (
        <>
        <BrowserRouter>
        <div className="flex menu gap-20 p-10">
        <div href="" className="table">
          <Image
            alt="table"
            height={table.height}
            src={table}
            width={67}
            load="lazy" />
            <div className="table-text" style={{fontSize: '20px', color: 'rgb(225, 163, 163)'}}><Link to='#table' smooth>{t('translation:table')}</Link></div>
        </div>
        <div href="" className="shelf">
          <Image
            alt="shelf"
            height={shelf.height}
            src={shelf}
            width={67}
            load="lazy" />
            <div className="shelf-text" style={{fontSize: '20px', color: 'rgb(225, 163, 163)'}}><Link to='#shelf' smooth>{t('translation:shelf')}</Link></div>
        </div>
        <div href="" className="swing">
          <Image
            alt="swing"
            height={150}
            src={swing}
            width={67}
            load="lazy" />
            <div className="swing-text" style={{fontSize: '20px', color: 'rgb(225, 163, 163)'}}><Link to='#swing' smooth>{t('translation:swing')}</Link></div>
        </div>
        <div href="" className="horse">
          <Image
            alt="horse"
            height={horse.height}
            src={horse}
            width={86}
            load="lazy" />
            <div className="toy-text" style={{fontSize: '20px', color: 'rgb(225, 163, 163)'}}><Link to='#toy' smooth>{t('translation:toy')}</Link></div>
        </div>
        <div href="" className="chair">
          <Image
            alt="chair"
            height={chair.height}
            src={chair}
            width={78}
            load="lazy" />
            <div className="chair-text" style={{fontSize: '20px', color: 'rgb(225, 163, 163)'}}><Link to='#chair' smooth>{t('translation:chair')}</Link></div>
        </div>
      </div>
      </BrowserRouter>
      </>
    )
};