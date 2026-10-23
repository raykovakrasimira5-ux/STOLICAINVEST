import { XMLParser } from 'fast-xml-parser';
import { Property, PropertyCategory, DealType, Agent } from '../types';

export interface RawEstatePlusItem {
  EstateID: string | number;
  MainType?: string | number;
  SubType?: string | number;
  Status?: string | number;
  Country?: string | number;
  CountryName?: string;
  Domain?: string | number;
  DomainName?: string;
  City?: string | number;
  CityName?: string;
  SubCity?: string | number;
  SubCityName?: string;
  DealType?: string | number;
  EstateName?: {
    content?: Array<{ lang?: string | number; text?: string }>;
  };
  EstateRefCode?: string;
  UpdateDate?: string;
  CreateDate?: string;
  Price?: string | number;
  OldPrice?: string | number;
  Currency?: string | number;
  Description?: {
    content?: Array<{ lang?: string | number; text?: string }>;
  };
  YoutubeLink?: string;
  EmbedLink?: string;
  Tags?: {
    Top?: string | number;
    Exclusive?: string | number;
    Nocommission?: string | number;
  };
  Latitude?: string | number;
  Longtitude?: string | number;
  BrokerID?: string | number;
  BrokerName?: string;
  BrokerTel?: string;
  BrokerEmail?: string;
  BrokerImg?: string;
  Images?: {
    Image?: string[] | string;
  };
  Amenities?: {
    Amenity?: Array<string | number> | string | number;
  };
  SpecialData?: {
    ConstructType?: string | number;
    ConstructInfos?: {
      ConstructInfoText?: string | number;
      ConstructYear?: string | number;
    };
    Area?: string | number;
    BuiltArea?: string | number;
    LandArea?: string | number;
    OpenedArea?: string | number;
    Rooms?: string | number;
    Bedrooms?: string | number;
    Bathrooms?: string | number;
    Floor?: string | number;
    Floors?: string | number;
    Position?: string | number;
    NewBuildID?: string | number;
    Heatings?: {
      Heating?: Array<string | number> | string | number;
    };
    Stage?: string | number;
    Statute?: string | number;
    KINT?: string | number;
    Height?: string | number;
    MinPlanting?: string | number;
    CompleteLevel?: string | number;
    Communications?: string;
  };
}

// Map MainType and SubType to clean Bulgarian category strings matching website filters
export function mapEstatePlusCategory(
  mainType?: string | number,
  subType?: string | number,
  title?: string
): { category: PropertyCategory; categoryLabel: string } {
  const mt = String(mainType || '').trim();
  const st = String(subType || '').trim();
  const lowerTitle = (title || '').toLowerCase();

  // If title has obvious prefix, prioritize it for maximum precision
  if (lowerTitle.includes('1-стаен') || lowerTitle.includes('едностаен') || lowerTitle.includes('гарсониера') || lowerTitle.includes('боксониера')) {
    return { category: '1-стаен', categoryLabel: '1-стаен апартамент' };
  }
  if (lowerTitle.includes('2-стаен') || lowerTitle.includes('двустаен')) {
    return { category: '2-стаен', categoryLabel: '2-стаен апартамент' };
  }
  if (lowerTitle.includes('3-стаен') || lowerTitle.includes('тристаен')) {
    return { category: '3-стаен', categoryLabel: '3-стаен апартамент' };
  }
  if (lowerTitle.includes('4-стаен') || lowerTitle.includes('четиристаен')) {
    return { category: '4-стаен', categoryLabel: '4-стаен апартамент' };
  }
  if (lowerTitle.includes('мезонет')) {
    return { category: 'мезонет', categoryLabel: 'Мезонет' };
  }
  if (lowerTitle.includes('многостаен')) {
    return { category: 'многостаен', categoryLabel: 'Многостаен апартамент' };
  }
  if (lowerTitle.includes('етаж от къща')) {
    return { category: 'етаж от къща', categoryLabel: 'Етаж от къща' };
  }
  if (lowerTitle.includes('вила')) {
    return { category: 'вила', categoryLabel: 'Вила' };
  }
  if (lowerTitle.includes('къща')) {
    return { category: 'къща', categoryLabel: 'Къща' };
  }
  if (lowerTitle.includes('гараж') || lowerTitle.includes('паркомясто')) {
    return { category: 'ГАРАЖ', categoryLabel: 'Гараж / Паркомясто' };
  }
  if (lowerTitle.includes('земеделска земя') || lowerTitle.includes('нива')) {
    return { category: 'ЗЕМЕДЕЛСКА ЗЕМЯ', categoryLabel: 'Земеделска земя' };
  }
  if (lowerTitle.includes('парцел') || lowerTitle.includes('дворно място') || lowerTitle.includes('тере')) {
    return { category: 'Парцел', categoryLabel: 'Парцел' };
  }

  // Fallback to code mappings from Estate Plus
  if (mt === '1') {
    // Жилища
    switch (st) {
      case '4':
      case '5':
      case '41':
        return { category: '1-стаен', categoryLabel: '1-стаен апартамент' };
      case '9':
        return { category: '2-стаен', categoryLabel: '2-стаен апартамент' };
      case '8':
        return { category: '3-стаен', categoryLabel: '3-стаен апартамент' };
      case '27':
        return { category: '4-стаен', categoryLabel: '4-стаен апартамент' };
      case '15':
      case '28':
        return { category: 'многостаен', categoryLabel: 'Многостаен апартамент' };
      case '7':
        return { category: 'мезонет', categoryLabel: 'Мезонет' };
      case '14':
        return { category: 'ателие', categoryLabel: 'Ателие / Студио' };
      case '43':
        return { category: 'ГАРАЖ', categoryLabel: 'Гараж' };
      default:
        return { category: '2-стаен', categoryLabel: 'Апартамент' };
    }
  }

  if (mt === '2') {
    // Къщи и вили
    switch (st) {
      case '11':
        return { category: 'вила', categoryLabel: 'Вила' };
      case '38':
        return { category: 'етаж от къща', categoryLabel: 'Етаж от къща' };
      case '34':
      default:
        return { category: 'къща', categoryLabel: 'Къща' };
    }
  }

  if (mt === '3') {
    // Парцели и земя
    if (st === '20') {
      return { category: 'ЗЕМЕДЕЛСКА ЗЕМЯ', categoryLabel: 'Земеделска земя' };
    }
    return { category: 'Парцел', categoryLabel: 'Парцел' };
  }

  if (mt === '4') {
    // Търговски и бизнес имоти
    switch (st) {
      case '16':
      case '9993':
      case '99948':
      case '99949':
        return { category: 'офис', categoryLabel: 'Офис' };
      case '17':
      case '32':
      case '99925':
      case '99932':
      case '9994':
      case '99950':
      case '99951':
        return { category: 'магазин', categoryLabel: 'Магазин' };
      case '29':
      case '99915':
      case '99920':
      case '99927':
      case '99936':
        return { category: 'заведение', categoryLabel: 'Заведение' };
      case '99934':
      case '99935':
        return { category: 'склад', categoryLabel: 'Склад' };
      case '25':
      case '99928':
      case '99942':
      case '9997':
        return { category: 'пром. помещение', categoryLabel: 'Промишлено помещение' };
      case '6':
      case '99930':
        return { category: 'ГАРАЖ', categoryLabel: 'Гараж / Паркомясто' };
      default:
        return { category: 'Бизнес имот', categoryLabel: 'Бизнес имот' };
    }
  }

  return { category: 'Бизнес имот', categoryLabel: 'Имот' };
}

// Construction type translation
export function translateConstructType(typeId?: string | number): string {
  const code = String(typeId || '').trim();
  switch (code) {
    case '1':
      return 'Тухла';
    case '2':
      return 'Панел';
    case '3':
      return 'Гредоред';
    case '4':
      return 'Пакетно-повдигани плочи (ПК)';
    case '5':
      return 'Метална конструкция';
    case '6':
      return 'Сглобяема';
    case '9':
      return 'Ново строителство (Монолит)';
    case '12':
      return 'Стоманобетон';
    case '13':
      return 'ЕПК (Едроплощен кофраж)';
    case '16':
      return 'Масивна тухла';
    default:
      return 'Тухла / Монолит';
  }
}

// Heating translation
export function translateHeating(heatingIds?: Array<string | number> | string | number): { list: string[]; text: string } {
  if (!heatingIds) return { list: [], text: 'Локално / Климатик' };
  const rawList = Array.isArray(heatingIds) ? heatingIds : [heatingIds];
  const list: string[] = [];

  for (const h of rawList) {
    const code = String(h).trim();
    switch (code) {
      case '17':
        list.push('ТЕЦ');
        break;
      case '5':
        list.push('Климатик');
        break;
      case '15':
        list.push('Газ');
        break;
      case '1':
        list.push('Локално парно');
        break;
      case '4':
        list.push('Електричество');
        break;
      case '16':
        list.push('Пелети / Дърва');
        break;
      case '8':
        list.push('Соларни панели');
        break;
      default:
        break;
    }
  }

  const unique = Array.from(new Set(list));
  return {
    list: unique,
    text: unique.length > 0 ? unique.join(', ') : 'Климатик / Електричество',
  };
}

// Exposure / Position translation
export function translatePosition(posId?: string | number): string | undefined {
  const code = String(posId || '').trim();
  switch (code) {
    case '1':
      return 'Изток';
    case '2':
      return 'Запад';
    case '3':
      return 'Север';
    case '4':
      return 'Юг';
    case '5':
      return 'Югоизток';
    case '6':
      return 'Югозапад';
    case '7':
      return 'Североизток';
    case '8':
      return 'Северозапад';
    case '9':
      return 'Изток / Запад';
    case '10':
      return 'Юг / Север';
    default:
      return undefined;
  }
}

// Statute translation
export function translateStatute(statuteId?: string | number): string | undefined {
  const code = String(statuteId || '').trim();
  switch (code) {
    case '1':
      return 'В регулация (УПИ)';
    case '2':
      return 'Земеделска земя / ПИ (Извън регулация)';
    default:
      return undefined;
  }
}

// Stage translation
export function translateStage(stageId?: string | number): string | undefined {
  const code = String(stageId || '').trim();
  switch (code) {
    case '1':
      return 'Акт 16 (Готов за ползване)';
    case '2':
      return 'В строеж (Акт 14 / Акт 15)';
    default:
      return undefined;
  }
}

// Extract Bulgarian text from multilingual node (<content><lang>1</lang><text>...</text></content>)
function extractBulgarianText(node?: { content?: Array<{ lang?: string | number; text?: string }> }): string {
  if (!node || !node.content) return '';
  const contents = Array.isArray(node.content) ? node.content : [node.content];

  // Try Bulgarian first (lang === '1' or 1)
  const bgContent = contents.find((c) => String(c.lang) === '1' && c.text && c.text.trim());
  if (bgContent && bgContent.text) {
    return cleanText(bgContent.text);
  }

  // Fallback to any non-empty text
  const anyContent = contents.find((c) => c.text && c.text.trim());
  if (anyContent && anyContent.text) {
    return cleanText(anyContent.text);
  }

  return '';
}

// Clean XML text, decode entities, normalize newlines
function cleanText(text: string): string {
  return text
    .replace(/&#13;/g, '\n')
    .replace(/&#10;/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

// Default real estate fallback image when an offer has 0 photos
const FALLBACK_IMAGE = '/assets/aistudio/hoise_8579d183.png';

// Transform single raw Estate Plus item into our TypeScript Property
export function transformEstatePlusItem(item: RawEstatePlusItem): Property | null {
  if (!item || !item.EstateID) return null;

  const estateId = String(item.EstateID).trim();
  const refNumber = item.EstateRefCode ? String(item.EstateRefCode).trim() : `EP-${estateId}`;

  // DealType: 1 = sale, 2 = rent
  const dealType: DealType = String(item.DealType).trim() === '2' ? 'rent' : 'sale';

  // Title in Bulgarian
  let title = extractBulgarianText(item.EstateName);

  // Geographic Info
  let rawCity = (item.CityName || 'гр. Русе').trim();
  let city = rawCity.replace(/^(гр\.|с\.)\s*/i, '').trim() || 'Русе';
  if (rawCity.toLowerCase().startsWith('с.')) {
    city = `с. ${city}`;
  }

  let neighborhood = (item.SubCityName || '').trim();
  if (!neighborhood) {
    neighborhood = city === 'Русе' ? 'Център' : city;
  }

  // Category and Bulgarian label
  const { category, categoryLabel } = mapEstatePlusCategory(item.MainType, item.SubType, title);

  if (!title) {
    title = `${categoryLabel} в ${neighborhood}`;
  }

  // Description in Bulgarian
  const description = extractBulgarianText(item.Description);

  // Price & Currency:
  // Currency 2 is EUR; Currency 1 is BGN (leva)
  const rawPrice = Number(item.Price) || 0;
  const currencyCode = String(item.Currency || '2').trim();
  let price = rawPrice;
  let originalCurrency: 'EUR' | 'BGN' = 'EUR';
  let originalPrice = rawPrice;

  if (currencyCode === '1') {
    // BGN -> Convert to EUR for uniform search/sorting
    originalCurrency = 'BGN';
    originalPrice = rawPrice;
    price = Math.round(rawPrice / 1.95583);
  }

  const oldPrice = item.OldPrice && Number(item.OldPrice) > 0 ? Number(item.OldPrice) : undefined;

  // Status: 1 = active, 2 = offered/reserved, 3 = sold
  const statusNum = Number(item.Status) as 1 | 2 | 3;
  const status: 1 | 2 | 3 = [1, 2, 3].includes(statusNum) ? statusNum : 1;
  const statusLabel = status === 1 ? 'Активна' : status === 2 ? 'Резервиран' : 'Продаден';

  // Special Data fields
  const sd = item.SpecialData || {};
  const area =
    Number(sd.Area) ||
    Number(sd.BuiltArea) ||
    Number(sd.LandArea) ||
    Number(sd.OpenedArea) ||
    0;

  const builtArea = sd.BuiltArea ? Number(sd.BuiltArea) : undefined;
  const landArea = sd.LandArea ? Number(sd.LandArea) : undefined;
  const openedArea = sd.OpenedArea ? Number(sd.OpenedArea) : undefined;
  const rooms = sd.Rooms ? Number(sd.Rooms) : undefined;
  const bedrooms = Number(sd.Bedrooms) || 0;
  const bathrooms = Number(sd.Bathrooms) || 1;
  const floor = sd.Floor ? Number(sd.Floor) : undefined;
  const totalFloors = sd.Floors ? Number(sd.Floors) : undefined;

  // Year built
  let yearBuilt: number | undefined = undefined;
  if (sd.ConstructInfos?.ConstructYear) {
    const y = Number(sd.ConstructInfos.ConstructYear);
    if (y > 1900 && y < 2100) {
      yearBuilt = y;
    }
  }

  const constructionType = translateConstructType(sd.ConstructType);
  const position = translatePosition(sd.Position);
  const statute = translateStatute(sd.Statute);
  const stage = translateStage(sd.Stage);
  const heatingResult = translateHeating(sd.Heatings?.Heating);

  // Images
  let images: string[] = [];
  if (item.Images?.Image) {
    if (Array.isArray(item.Images.Image)) {
      images = item.Images.Image.map((u) => String(u).trim()).filter(Boolean);
    } else if (typeof item.Images.Image === 'string' && item.Images.Image.trim()) {
      images = [item.Images.Image.trim()];
    }
  }
  if (images.length === 0) {
    images = [FALLBACK_IMAGE];
  }

  // Tags
  const isFeatured = String(item.Tags?.Top || '').trim() === '1';
  const isExclusive = String(item.Tags?.Exclusive || '').trim() === '1';
  const noCommission = String(item.Tags?.Nocommission || '').trim() === '1';
  const isNew = Boolean(sd.NewBuildID) || constructionType.includes('Ново');

  // Broker Information
  let brokerName = (item.BrokerName || '').trim();
  if (!brokerName || brokerName.toLowerCase() === 'офис') {
    brokerName = 'Консултант Столица Инвест';
  }
  let brokerPhone = (item.BrokerTel || '').trim();
  if (!brokerPhone) {
    brokerPhone = '0876 081 309';
  } else if (!brokerPhone.includes(' ') && brokerPhone.length === 10) {
    // Format 0876081309 -> 0876 081 309
    brokerPhone = `${brokerPhone.slice(0, 4)} ${brokerPhone.slice(4, 7)} ${brokerPhone.slice(7)}`;
  }

  const brokerEmail = (item.BrokerEmail || 'stolitsainvest@mail.bg').trim();
  const brokerAvatar = item.BrokerImg && !item.BrokerImg.includes('placeholder')
    ? item.BrokerImg
    : '/assets/aistudio/broker_avatar_stolica.png';

  const agent: Agent = {
    name: brokerName,
    phone: brokerPhone,
    email: brokerEmail,
    avatar: brokerAvatar,
    agencyRole: 'Брокер недвижими имоти',
  };

  // Features list
  const features: string[] = [];
  if (isExclusive) features.push('Ексклузивна оферта');
  if (isFeatured) features.push('Топ оферта');
  if (isNew) features.push('Ново строителство');
  if (heatingResult.list.length > 0) {
    features.push(...heatingResult.list);
  }
  if (constructionType) features.push(constructionType);
  if (stage) features.push(stage);
  if (statute) features.push(statute);
  if (position) features.push(`Изложение: ${position}`);
  if (floor && totalFloors) features.push(`Етаж ${floor} от ${totalFloors}`);

  // Clean and unique features
  const uniqueFeatures = Array.from(new Set(features));

  return {
    id: estateId, // EstateID as stable synchronization key
    estateId,
    refNumber,
    title,
    dealType,
    category,
    categoryLabel,
    price,
    currency: 'EUR',
    originalPrice,
    originalCurrency,
    oldPrice,
    status,
    statusLabel,
    city,
    neighborhood,
    // Note: No exact street address included to respect user's explicit requirement
    lat: item.Latitude ? Number(item.Latitude) : undefined,
    lng: item.Longtitude ? Number(item.Longtitude) : undefined,
    area,
    builtArea,
    landArea,
    openedArea,
    rooms,
    bedrooms,
    bathrooms,
    floor,
    totalFloors,
    yearBuilt,
    constructionType,
    position,
    newBuildId: sd.NewBuildID ? String(sd.NewBuildID) : undefined,
    heatings: heatingResult.list,
    heatingText: heatingResult.text,
    statute,
    kint: sd.KINT ? Number(sd.KINT) : undefined,
    height: sd.Height ? Number(sd.Height) : undefined,
    minPlanting: sd.MinPlanting ? Number(sd.MinPlanting) : undefined,
    completeLevel: sd.CompleteLevel ? String(sd.CompleteLevel) : undefined,
    stage,
    images,
    featured: isFeatured,
    exclusive: isExclusive,
    noCommission,
    isNew,
    youtubeLink: item.YoutubeLink ? String(item.YoutubeLink).trim() : undefined,
    description,
    features: uniqueFeatures,
    agent,
    createdAt: item.CreateDate || new Date().toISOString(),
    updatedAt: item.UpdateDate || new Date().toISOString(),
  };
}

// Parse entire XML feed into a synchronized list of Properties
export function parseEstatePlusXml(xmlText: string): {
  properties: Property[];
  allProperties: Property[]; // includes reserved and sold
  activeCount: number;
  reservedCount: number;
  soldCount: number;
  updatedTimestamp: string;
  agencyName: string;
} {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
    isArray: (name) => ['Image', 'content', 'Heating', 'Item', 'Amenity'].includes(name),
  });

  const parsed = parser.parse(xmlText);
  const items: RawEstatePlusItem[] = parsed.feed?.Offers?.Item || [];
  const agencyName = parsed.feed?.AgencyName || 'Столица инвест ЕООД';
  const updatedTimestamp = parsed.feed?.Updated || new Date().toISOString();

  const allProperties: Property[] = [];
  const propertyMap = new Map<string, Property>();

  for (const rawItem of items) {
    const prop = transformEstatePlusItem(rawItem);
    if (prop) {
      // Deduplicate using EstateID
      if (!propertyMap.has(prop.id)) {
        propertyMap.set(prop.id, prop);
        allProperties.push(prop);
      }
    }
  }

  // Active listings only for default public view
  const activeProperties = allProperties.filter((p) => p.status === 1);
  const reservedProperties = allProperties.filter((p) => p.status === 2);
  const soldProperties = allProperties.filter((p) => p.status === 3);

  return {
    properties: activeProperties,
    allProperties,
    activeCount: activeProperties.length,
    reservedCount: reservedProperties.length,
    soldCount: soldProperties.length,
    updatedTimestamp,
    agencyName,
  };
}
