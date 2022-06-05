export default interface ICivilization {
    id: number;
    name: string;
    expansion: string;
    unique_unit: string[];
    unique_tech: string[];
    team_bonus: string;
    civilization_bonus: string[];
    army_type: string;
}