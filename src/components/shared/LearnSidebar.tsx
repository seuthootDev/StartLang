import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {
  CATEGORY_GROUPS,
  categoriesInGroup,
  categoryHint,
  categoryLabel,
  groupLabel,
  type CategoryGroupId,
  type CategoryGroupMeta,
  type CategoryMeta,
} from '../../config/categories'
import { getLanguage, isTargetLang } from '../../config/languages'
import { t } from '../../config/uiStrings'
import { useSession } from '../../context/SessionContext'
import { getCategoryCount } from '../../data'
import type { LangCode, TargetLangCode } from '../../types/language'

const COLLAPSE_STORAGE_KEY = 'langstart.sidebarGroups'

function readCollapsedPrefs(): Partial<Record<CategoryGroupId, boolean>> {
  try {
    const raw = localStorage.getItem(COLLAPSE_STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<Record<CategoryGroupId, boolean>>
  } catch {
    return {}
  }
}

function writeCollapsedPrefs(prefs: Partial<Record<CategoryGroupId, boolean>>) {
  try {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

export function LearnSidebar() {
  const { targetLang } = useParams()
  const { learnerLang } = useSession()
  const [collapsed, setCollapsed] = useState<Partial<Record<CategoryGroupId, boolean>>>(
    () => {
      const saved = readCollapsedPrefs()
      const initial: Partial<Record<CategoryGroupId, boolean>> = {}
      for (const group of CATEGORY_GROUPS) {
        initial[group.id] =
          saved[group.id] ?? Boolean(group.defaultCollapsed)
      }
      return initial
    },
  )

  useEffect(() => {
    writeCollapsedPrefs(collapsed)
  }, [collapsed])

  if (!targetLang || !isTargetLang(targetLang)) return null

  const target = getLanguage(targetLang)
  if (!target) return null

  const code = targetLang as TargetLangCode

  const toggleGroup = (id: CategoryGroupId) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <div className="learn-sidebar__head">
        <p className="learn-sidebar__lang-en">{target.englishName}</p>
        <h1 className="learn-sidebar__lang">{target.nativeName}</h1>
      </div>

      <nav className="learn-sidebar__nav" aria-label={t(learnerLang, 'categories')}>
        <NavLink
          to={`/${targetLang}`}
          end
          className={({ isActive }) =>
            `learn-sidebar__link${isActive ? ' is-active' : ''}`
          }
        >
          <span>{t(learnerLang, 'overview')}</span>
        </NavLink>

        {CATEGORY_GROUPS.map((group) => (
          <SidebarGroup
            key={group.id}
            group={group}
            code={code}
            learnerLang={learnerLang}
            targetLang={targetLang}
            collapsed={Boolean(collapsed[group.id])}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </nav>
    </>
  )
}

function SidebarGroup({
  group,
  code,
  learnerLang,
  targetLang,
  collapsed,
  onToggle,
}: {
  group: CategoryGroupMeta
  code: TargetLangCode
  learnerLang: LangCode
  targetLang: string
  collapsed: boolean
  onToggle: () => void
}) {
  const items = categoriesInGroup(group.id, code)
  const panelId = `sidebar-group-${group.id}`

  return (
    <div className={`learn-sidebar__group${collapsed ? ' is-collapsed' : ''}`}>
      <button
        type="button"
        className="learn-sidebar__section"
        aria-expanded={!collapsed}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{groupLabel(group, learnerLang)}</span>
        <span className="learn-sidebar__chev" aria-hidden>
          {collapsed ? '▸' : '▾'}
        </span>
      </button>

      {!collapsed && (
        <div id={panelId} className="learn-sidebar__group-body">
          {items.length === 0 ? (
            <p className="learn-sidebar__empty">{t(learnerLang, 'comingSoon')}</p>
          ) : (
            items.map((category) => (
              <CategoryNavItem
                key={category.id}
                category={category}
                code={code}
                learnerLang={learnerLang}
                targetLang={targetLang}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function CategoryNavItem({
  category,
  code,
  learnerLang,
  targetLang,
}: {
  category: CategoryMeta
  code: TargetLangCode
  learnerLang: LangCode
  targetLang: string
}) {
  const count = getCategoryCount(code, category.id)
  const hint = categoryHint(category, code, learnerLang)
  const enabled = count > 0
  const label = categoryLabel(category, learnerLang)

  if (!enabled) {
    return (
      <span
        className="learn-sidebar__link learn-sidebar__link--disabled"
        aria-disabled="true"
      >
        <span className="learn-sidebar__step">{category.step}</span>
        <span className="learn-sidebar__link-body">
          <span>{label}</span>
          {hint && <span className="learn-sidebar__hint">{hint}</span>}
        </span>
        <span className="learn-sidebar__soon">{t(learnerLang, 'comingSoon')}</span>
      </span>
    )
  }

  return (
    <NavLink
      to={`/${targetLang}/${category.id}`}
      className={({ isActive }) =>
        `learn-sidebar__link learn-sidebar__link--row${isActive ? ' is-active' : ''}`
      }
    >
      <span className="learn-sidebar__step">{category.step}</span>
      <span className="learn-sidebar__link-body">
        <span>{label}</span>
        {hint && <span className="learn-sidebar__hint">{hint}</span>}
      </span>
    </NavLink>
  )
}
