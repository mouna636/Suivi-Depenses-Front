
    
    
    export interface Depense {
  _id: string;
  montant: string;
  date: string;
  description: string;
  
  tagId: string;
  userId: string;
  categoryId: {
    name: string;
    // Autres propriétés éventuelles de categoryId
  };
  // Au
}
