// // enum KbKeyLabelType {
// //     TEXT = 'text',
// //     LATEX = 'latex'
// // }

// type KbKeyProps = {
//     id: string;
//     name: string;
//     latex: string;
//     label?: string;
//     labelType?: KbKeyLabelType;
// }

// class KbKey {
//     id: string;
//     name: string;
//     latex: string;
//     label: string;
//     labelType: KbKeyLabelType;

//     constructor(props: KbKeyProps) {
//         this.id = props.id;
//         this.name = props.name;
//         this.latex = props.latex;
//         this.label = props.label ?? props.latex;
//         this.labelType = props.labelType ?? KbKeyLabelType.LATEX;
//     }

//     get displayLabel(): string {
//         return this.labelType === KbKeyLabelType.TEXT ? this.label : this.latex;
//     }
// }
