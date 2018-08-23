export const INDUSTRY = 'INDUSTRY';
export const COMMERCE = 'COMMERCE';
export const OTHER = 'OTHER';
export const EDIFICATION = 'EDIFICATION';

export const OTHER_LABEL = 'Outro (especificar)';
export const OTHER_OBJECT = { id: OTHER, name: OTHER_LABEL };

export const DEPARTMENTS_OPTIONS = [
  { id: INDUSTRY, name: 'Indústria' },
  { id: COMMERCE, name: 'Comércio' },
  { id: EDIFICATION, name: 'Edificação' },
  OTHER_OBJECT,
];

export const SUBDEPARTMENTS_OPTIONS = {
  [COMMERCE]: [
    { id: '1', name: 'Supermercado' },
    { id: '2', name: 'Farmácia' },
    { id: '3', name: 'Shopping Center' },
    OTHER_OBJECT,
  ],
  [EDIFICATION]: [
    { id: '1', name: 'Edifícios Públicos' },
    { id: '2', name: 'Escritório Corporativo' },
    { id: '3', name: 'Escolas e Universidades' },
    { id: '4', name: 'Hospitais' },
    OTHER_OBJECT,
  ],
  [INDUSTRY]: [
    { id: '1', name: 'AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS' },
    { id: '2', name: 'EXTRAÇÃO DE CARVÃO MINERAL' },
    { id: '3', name: 'EXTRAÇÃO DE PETRÓLEO E GÁS NATURAL' },
    { id: '4', name: 'EXTRAÇÃO DE MINERAIS METÁLICOS' },
    { id: '5', name: 'EXTRAÇÃO DE MINERAIS NÃO-METÁLICOS' },
    { id: '6', name: 'ATIVIDADES DE APOIO À EXTRAÇÃO DE MINERAIS' },
    { id: '7', name: 'FABRICAÇÃO DE PRODUTOS ALIMENTÍCIOS' },
    { id: '8', name: 'FABRICAÇÃO DE BEBIDAS' },
    { id: '9', name: 'FABRICAÇÃO DE PRODUTOS DO FUMO' },
    { id: '10', name: 'FABRICAÇÃO DE PRODUTOS TÊXTEIS' },
    { id: '11', name: 'CONFECÇÃO DE ARTIGOS DO VESTUÁRIO E ACESSÓRIOS' },
    {
      id: '12',
      name:
        'PREPARAÇÃO DE COUROS E FABRICAÇÃO DE ARTEFATOS DE COURO, ARTIGOS PARA VIAGEM E CALÇADOS',
    },
    { id: '13', name: 'FABRICAÇÃO DE PRODUTOS DE MADEIRA' },
    { id: '14', name: 'FABRICAÇÃO DE CELULOSE, PAPEL E PRODUTOS DE PAPEL' },
    { id: '15', name: 'IMPRESSÃO E REPRODUÇÃO DE GRAVAÇÕES' },
    {
      id: '16',
      name:
        'FABRICAÇÃO DE COQUE, DE PRODUTOS DERIVADOS DO PETRÓLEO E DE BIOCOMBUSTÍVEIS',
    },
    { id: '17', name: 'FABRICAÇÃO DE PRODUTOS QUÍMICOS' },
    { id: '18', name: 'FABRICAÇÃO DE PRODUTOS FARMOQUÍMICOS E FARMACÊUTICOS' },
    {
      id: '19',
      name: 'FABRICAÇÃO DE PRODUTOS DE BORRACHA E DE MATERIAL PLÁSTICO',
    },
    { id: '20', name: 'FABRICAÇÃO DE PRODUTOS DE MINERAIS NÃO-METÁLICOS' },
    { id: '21', name: 'METALURGIA' },
    {
      id: '22',
      name: 'FABRICAÇÃO DE PRODUTOS DE METAL, EXCETO MÁQUINAS E EQUIPAMENTOS',
    },
    {
      id: '23',
      name:
        'FABRICAÇÃO DE EQUIPAMENTOS DE INFORMÁTICA, PRODUTOS ELETRÔNICOS E ÓPTICOS',
    },
    {
      id: '24',
      name: 'FABRICAÇÃO DE MÁQUINAS, APARELHOS E MATERIAIS ELÉTRICOS',
    },
    { id: '25', name: 'FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS' },
    {
      id: '26',
      name: 'FABRICAÇÃO DE VEÍCULOS AUTOMOTORES, REBOQUES E CARROCERIAS',
    },
    {
      id: '27',
      name:
        'FABRICAÇÃO DE OUTROS EQUIPAMENTOS DE TRANSPORTE, EXCETO VEÍCULOS AUTOMOTORES',
    },
    { id: '28', name: 'FABRICAÇÃO DE MÓVEIS' },
    { id: '29', name: 'FABRICAÇÃO DE PRODUTOS DIVERSOS' },
    {
      id: '30',
      name: 'MANUTENÇÃO, REPARAÇÃO E INSTALAÇÃO DE MÁQUINAS E EQUIPAMENTOS',
    },
    OTHER_OBJECT,
  ],
};
