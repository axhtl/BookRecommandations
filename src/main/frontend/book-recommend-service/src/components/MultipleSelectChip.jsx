import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genres = [
  "인문학",
  "사회과학",
  "예술/대중문화",
  "청소년",
  "외국어",
  "역사",
  "문학",
  "자기계발",
  "유아",
  "만화",
  "고전",
  "교육/자료",
  "인문/사회",
  "컴퓨터/모바일",
  "요리/살림",
  "어린이",
  "여행",
  "에세이",
  "라이트노벨",
  "종교/역학",
  "소설",
  "건강/취미",
  "전기/자서전",
  "시",
  "경제경영",
  "과학",
];

function getStyles(genre, genreName, theme) {
  return {
    fontWeight: genreName.includes(genre)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function MultipleSelectChip({ selectedGenres, setSelectedGenres }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Genre</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
              style={getStyles(genre, selectedGenres, theme)}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MultipleSelectChip.propTypes = {
  selectedGenres: PropTypes.array.isRequired,
  setSelectedGenres: PropTypes.func.isRequired,
};

export default MultipleSelectChip;
