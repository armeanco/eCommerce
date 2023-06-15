import { Image } from '../core/Image';
import { useTranslation, Trans } from 'react-i18next';

export const ExampleFixedBackground = () => {
  const { t } = useTranslation();
  //const { t, i18n, ready } = useTranslation();
  /*const target = useRef(null);
  const train = useParallax({
    speed: 500,
    targetElement: target.current,
  })

  const cloud = useParallax({
    speed: 200,
    targetElement: target.current,
  })*/
  
  //if( !ready ) return '...loading';
  return (
    <section className="bg-dark">
      <Image src="/materials/prod/canvas_slide_2.jpg" alt="img" height="50vh" fixed darken>
        <div className="justify-content items-center">
        <div className="ptext" style={{color: 'rgb(248, 248, 248)', fontSize: '30px'}}>
        <Trans i18nKey="translation:multiline"/>
        </div>
{/*<div className="details" style={{color: 'rgb(201, 201, 201)', fontSize: '20px', borderWidth: 1,
    borderColor: "thistle", borderStyle: 'solid', paddingTop: 10, paddingRight: 10, paddingLeft: 10, paddingBottom: 10,
  borderRadius: 50}}><a style={{cursor: 'pointer'}}>{t('translation:details')}</a></div>*/}
</div>
      </Image>
      {/*<FillerSection />*/}
    </section>
  );
};